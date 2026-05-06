# FoodTrip Admin App - Development Guide

Complete guide untuk membuat fitur baru di admin app dengan workflow yang benar.

---

## 📋 Workflow Overview

```
1. Feature Planning
   ↓
2. Create Feature Folder Structure
   ↓
3. Create Hooks (Business Logic)
   ↓
4. Create Components (UI)
   ↓
5. Create Pages (Page Logic)
   ↓
6. Register Routes
   ↓
7. Test & Deploy
```

---

## 🚀 Step-by-Step Detailed Guide

### **Step 1: Feature Planning**

Tentukan fitur apa yang mau dibuat:

- Nama feature (singular): `restaurant`, `food`, `user`
- Operasi apa: CRUD (Create, Read, Update, Delete)?
- Data apa yang dibutuhkan?

**Contoh:** Feature Restaurant Management

- Operasi: Create, Read (list & detail), Update, Delete
- Data: id, name, address, phone, email, image, category

---

### **Step 2: Create Feature Folder Structure**

Buat direktori lengkap untuk feature:

```bash
mkdir -p apps/admin/src/features/restaurant/hooks
mkdir -p apps/admin/src/features/restaurant/components
mkdir -p apps/admin/src/features/restaurant/types
```

**Hasil struktur:**

```
apps/admin/src/features/restaurant/
├── hooks/
│   ├── useRestaurantList.ts
│   ├── useRestaurantDetail.ts
│   ├── useRestaurantCreate.ts
│   ├── useRestaurantUpdate.ts
│   ├── useRestaurantDelete.ts
│   └── __tests__/
├── components/
│   ├── RestaurantTable.tsx
│   ├── RestaurantForm.tsx
│   ├── RestaurantModal.tsx
│   └── RestaurantCard.tsx
├── types/
│   └── index.ts
├── index.ts (barrel export)
└── constants.ts (optional)
```

---

### **Step 3: Create Hooks (Business Logic)**

Hooks menghandle semua data fetching & mutations. Jangan ada UI logic di sini.

#### **3.1 List Hook** - Fetch semua data dengan pagination

**File:** `apps/admin/src/features/restaurant/hooks/useRestaurantList.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { restoAdminApi } from '@foodtrip/api';

interface RestaurantListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export function useRestaurantList(params?: RestaurantListParams) {
  return useQuery({
    queryKey: ['admin', 'restaurant', 'list', params],
    queryFn: () => restoAdminApi.getRestaurantList(params),
    staleTime: 1000 * 60 * 5, // 5 menit
    retry: 2,
  });
}
```

#### **3.2 Detail Hook** - Fetch data 1 restaurant

**File:** `apps/admin/src/features/restaurant/hooks/useRestaurantDetail.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { restoAdminApi } from '@foodtrip/api';

export function useRestaurantDetail(restaurantId: string) {
  return useQuery({
    queryKey: ['admin', 'restaurant', 'detail', restaurantId],
    queryFn: () => restoAdminApi.getRestaurantById(restaurantId),
    staleTime: 1000 * 60 * 5,
    enabled: !!restaurantId, // Jangan fetch kalau ID kosong
  });
}
```

#### **3.3 Create Hook** - Buat restaurant baru

**File:** `apps/admin/src/features/restaurant/hooks/useRestaurantCreate.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoAdminApi } from '@foodtrip/api';
import { useToast } from '@/providers/toast';
import type { RestaurantCreateInput } from '@foodtrip/types';

export function useRestaurantCreate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: RestaurantCreateInput) =>
      restoAdminApi.createRestaurant(data),

    onSuccess: (newRestaurant) => {
      // Invalidate list query untuk refresh data
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant', 'list'],
      });

      toast.success('Restaurant berhasil dibuat');
    },

    onError: (error: any) => {
      toast.error(error.message || 'Gagal membuat restaurant');
    },
  });
}
```

#### **3.4 Update Hook** - Update restaurant

**File:** `apps/admin/src/features/restaurant/hooks/useRestaurantUpdate.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoAdminApi } from '@foodtrip/api';
import { useToast } from '@/providers/toast';
import type { RestaurantUpdateInput } from '@foodtrip/types';

export function useRestaurantUpdate(restaurantId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: RestaurantUpdateInput) =>
      restoAdminApi.updateRestaurant(restaurantId, data),

    onSuccess: () => {
      // Invalidate both list dan detail queries
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant'],
      });

      toast.success('Restaurant berhasil diupdate');
    },

    onError: (error: any) => {
      toast.error(error.message || 'Gagal update restaurant');
    },
  });
}
```

#### **3.5 Delete Hook** - Hapus restaurant

**File:** `apps/admin/src/features/restaurant/hooks/useRestaurantDelete.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoAdminApi } from '@foodtrip/api';
import { useToast } from '@/providers/toast';

export function useRestaurantDelete() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (restaurantId: string) =>
      restoAdminApi.deleteRestaurant(restaurantId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'restaurant', 'list'],
      });

      toast.success('Restaurant berhasil dihapus');
    },

    onError: (error: any) => {
      toast.error(error.message || 'Gagal hapus restaurant');
    },
  });
}
```

#### **3.6 Export Hooks** - Barrel file

**File:** `apps/admin/src/features/restaurant/hooks/index.ts`

```typescript
export { useRestaurantList } from './useRestaurantList';
export { useRestaurantDetail } from './useRestaurantDetail';
export { useRestaurantCreate } from './useRestaurantCreate';
export { useRestaurantUpdate } from './useRestaurantUpdate';
export { useRestaurantDelete } from './useRestaurantDelete';
```

---

### **Step 4: Create Components (UI)**

Components adalah pure UI, receive data via props, tidak ada direct API calls.

#### **4.1 Table Component** - Display list data

**File:** `apps/admin/src/features/restaurant/components/RestaurantTable.tsx`

```typescript
import { Table, Button } from '@foodtrip/ui';
import { Skeleton } from '@/components';
import type { Restaurant } from '@foodtrip/types';

export interface RestaurantTableProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}

export function RestaurantTable({
  restaurants,
  isLoading,
  onEdit,
  onDelete,
}: RestaurantTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-12" />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Tidak ada restaurant
      </div>
    );
  }

  return (
    <Table>
      <thead>
        <tr className="border-b bg-gray-50">
          <th className="px-4 py-2 text-left">Nama</th>
          <th className="px-4 py-2 text-left">Kategori</th>
          <th className="px-4 py-2 text-left">Alamat</th>
          <th className="px-4 py-2 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant) => (
          <tr key={restaurant.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2 font-medium">{restaurant.name}</td>
            <td className="px-4 py-2">{restaurant.category}</td>
            <td className="px-4 py-2 text-sm text-gray-600">
              {restaurant.address}
            </td>
            <td className="px-4 py-2 text-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(restaurant.id)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(restaurant.id)}
              >
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
```

#### **4.2 Form Component** - Create & Edit form

**File:** `apps/admin/src/features/restaurant/components/RestaurantForm.tsx`

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormGroup, Input, Select } from '@foodtrip/ui';
import { RestaurantSchema } from '@foodtrip/types';
import type { Restaurant, RestaurantCreateInput } from '@foodtrip/types';

export interface RestaurantFormProps {
  initialData?: Restaurant;
  onSubmit: (data: RestaurantCreateInput) => Promise<void>;
  isLoading?: boolean;
}

export function RestaurantForm({
  initialData,
  onSubmit,
  isLoading,
}: RestaurantFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: zodResolver(RestaurantSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormGroup>
        <label>Nama Restaurant</label>
        <Input
          {...register('name')}
          placeholder="Masukkan nama restaurant"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </FormGroup>

      <FormGroup>
        <label>Kategori</label>
        <Select {...register('category')}>
          <option value="">Pilih kategori</option>
          <option value="asian">Asia</option>
          <option value="western">Western</option>
          <option value="fusion">Fusion</option>
        </Select>
        {errors.category && (
          <span className="text-red-500 text-sm">
            {errors.category.message}
          </span>
        )}
      </FormGroup>

      <FormGroup>
        <label>Alamat</label>
        <Input
          {...register('address')}
          placeholder="Masukkan alamat"
        />
        {errors.address && (
          <span className="text-red-500 text-sm">
            {errors.address.message}
          </span>
        )}
      </FormGroup>

      <FormGroup>
        <label>Telepon</label>
        <Input
          {...register('phone')}
          placeholder="Masukkan nomor telepon"
          type="tel"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </FormGroup>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
        <Button type="button" variant="outline" disabled={isLoading}>
          Batal
        </Button>
      </div>
    </form>
  );
}
```

#### **4.3 Export Components** - Barrel file

**File:** `apps/admin/src/features/restaurant/components/index.ts`

```typescript
export { RestaurantTable } from './RestaurantTable';
export { RestaurantForm } from './RestaurantForm';

// Export types
export type { RestaurantTableProps } from './RestaurantTable';
export type { RestaurantFormProps } from './RestaurantForm';
```

---

### **Step 5: Create Pages**

Pages menggabungkan hooks dan components, handle routing & data flow.

#### **5.1 List Page** - Show all restaurants

**File:** `apps/admin/src/pages/RestaurantListPage.tsx`

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@foodtrip/ui';
import {
  useRestaurantList,
  useRestaurantDelete,
  RestaurantTable,
} from '@/features/restaurant';

export default function RestaurantListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useRestaurantList({
    page,
    limit: 10,
    search,
  });

  const { mutate: deleteRestaurant, isPending: isDeleting } =
    useRestaurantDelete();

  const handleDelete = async (id: string) => {
    if (confirm('Yakin hapus restaurant ini?')) {
      deleteRestaurant(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manajemen Restaurant</h1>
        <Button onClick={() => navigate('/admin/restaurant/create')}>
          + Tambah Restaurant
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Cari restaurant..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error.message}
        </div>
      )}

      {/* Table */}
      <RestaurantTable
        restaurants={data?.restaurants || []}
        isLoading={isLoading}
        onEdit={(id) => navigate(`/admin/restaurant/${id}`)}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {data && (
        <div className="flex gap-2 justify-center">
          {Array.from({ length: data.totalPages }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                page === i + 1 ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

#### **5.2 Form Page** - Create or Edit restaurant

**File:** `apps/admin/src/pages/RestaurantFormPage.tsx`

```typescript
import { useNavigate, useParams } from 'react-router-dom';
import {
  useRestaurantDetail,
  useRestaurantCreate,
  useRestaurantUpdate,
  RestaurantForm,
} from '@/features/restaurant';
import { Skeleton } from '@/components';
import type { RestaurantCreateInput } from '@foodtrip/types';

export default function RestaurantFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  // Jika ada ID, itu mode edit
  const isEdit = !!id;

  const { data: restaurant, isLoading: isLoadingDetail } =
    useRestaurantDetail(id || '');

  const { mutate: createRestaurant, isPending: isCreating } =
    useRestaurantCreate();

  const { mutate: updateRestaurant, isPending: isUpdating } =
    useRestaurantUpdate(id || '');

  const isLoading = isLoadingDetail || isCreating || isUpdating;

  const handleSubmit = async (formData: RestaurantCreateInput) => {
    if (isEdit) {
      updateRestaurant(formData, {
        onSuccess: () => navigate('/admin/restaurant'),
      });
    } else {
      createRestaurant(formData, {
        onSuccess: () => navigate('/admin/restaurant'),
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {isEdit ? 'Edit Restaurant' : 'Tambah Restaurant'}
      </h1>

      {isLoadingDetail ? (
        <Skeleton className="h-96" />
      ) : (
        <RestaurantForm
          initialData={restaurant}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
```

---

### **Step 6: Register Routes**

Daftarkan pages di routes config dengan lazy loading.

**File:** `apps/admin/src/app/routes.tsx`

```typescript
import { lazy, Suspense } from 'react';
import { Spinner } from '@/components';
import { AdminLayout } from '@/layouts';

// Lazy load pages
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const RestaurantListPage = lazy(() => import('../pages/RestaurantListPage'));
const RestaurantFormPage = lazy(() => import('../pages/RestaurantFormPage'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-96">
    <Spinner />
  </div>
);

export const adminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurant',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantListPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurant/create',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantFormPage />
          </Suspense>
        ),
      },
      {
        path: 'restaurant/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantFormPage />
          </Suspense>
        ),
      },
    ],
  },
];
```

---

### **Step 7: Update Feature Barrel Export**

**File:** `apps/admin/src/features/restaurant/index.ts`

```typescript
// Hooks
export {
  useRestaurantList,
  useRestaurantDetail,
  useRestaurantCreate,
  useRestaurantUpdate,
  useRestaurantDelete,
} from './hooks';

// Components
export {
  RestaurantTable,
  RestaurantForm,
  type RestaurantTableProps,
  type RestaurantFormProps,
} from './components';

// Types (re-export from packages/types)
export type { Restaurant, RestaurantCreateInput } from '@foodtrip/types';
```

---

## ✅ Complete Checklist

### Pre-Development

- [ ] Feature sudah direncanakan dengan baik
- [ ] API endpoint sudah siap di `packages/api`
- [ ] Types sudah didefinisikan di `packages/types`

### Hook Development

- [ ] List hook dibuat dengan pagination/filtering
- [ ] Detail hook dibuat dengan proper `enabled` check
- [ ] Create hook dibuat dengan error handling & toast
- [ ] Update hook dibuat dengan query invalidation
- [ ] Delete hook dibuat dengan confirmation
- [ ] Hooks barrel export created

### Component Development

- [ ] Table component dibuat dengan loading skeleton
- [ ] Form component dibuat dengan react-hook-form + Zod
- [ ] Form validation messages ditampilkan
- [ ] Loading states ditangani dengan baik
- [ ] Error messages user-friendly
- [ ] Components barrel export created

### Page Development

- [ ] List page dibuat dengan search & pagination
- [ ] Form page dibuat untuk create & edit (dual purpose)
- [ ] Error handling ada di setiap page
- [ ] Navigation antar page working correctly
- [ ] Loading states menampilkan skeleton/spinner

### Routing & Integration

- [ ] Routes didaftarkan di `routes.tsx`
- [ ] Lazy loading & Suspense fallback ditambahkan
- [ ] Navigation links updated di sidebar/menu
- [ ] Feature barrel export updated

### Testing

- [ ] Test di dev environment: `pnpm dev`
- [ ] Test create → list, detail, edit, delete flows
- [ ] Test error cases (API failure, validation)
- [ ] Test loading states
- [ ] Test pagination & search
- [ ] Check console untuk errors/warnings

### Final Verification

- [ ] Tidak ada `any` types
- [ ] Tidak ada direct API calls di components
- [ ] Tidak ada useEffect untuk data fetching
- [ ] All styling menggunakan Tailwind
- [ ] TypeScript strict mode passing
- [ ] No console warnings/errors

---

## 🛠️ Useful Commands

```bash
# Development server
pnpm dev

# Type checking
pnpm tsc --noEmit

# Linting
pnpm lint

# Format code
pnpm format

# Build
pnpm build

# Clean
pnpm clean
```

---

## 📚 File Structure Reference

```
apps/admin/src/
├── app/
│   ├── App.tsx
│   ├── AppContent.tsx
│   └── routes.tsx ← Update here
├── features/
│   └── restaurant/ ← New feature folder
│       ├── hooks/
│       │   ├── useRestaurantList.ts
│       │   ├── useRestaurantDetail.ts
│       │   ├── useRestaurantCreate.ts
│       │   ├── useRestaurantUpdate.ts
│       │   ├── useRestaurantDelete.ts
│       │   └── index.ts
│       ├── components/
│       │   ├── RestaurantTable.tsx
│       │   ├── RestaurantForm.tsx
│       │   └── index.ts
│       ├── types/
│       │   └── index.ts
│       └── index.ts
├── pages/
│   ├── DashboardPage.tsx
│   ├── RestaurantListPage.tsx ← New page
│   └── RestaurantFormPage.tsx ← New page
├── layouts/
├── providers/
├── components/
└── styles/
```

---

## 🚨 Common Issues & Solutions

### Issue 1: useQuery not fetching

**Cause:** `enabled: false` atau queryKey berubah
**Solution:** Check `enabled` condition, pastikan queryKey stable

### Issue 2: Form tidak reset setelah submit

**Cause:** Initial values tidak update setelah mutation success
**Solution:** Use `useEffect` dengan dependency pada `initialData`, atau call `reset(data)`

### Issue 3: Toast notification tidak muncul

**Cause:** Toast provider tidak di-wrap di App
**Solution:** Check `apps/admin/src/app/App.tsx`, pastikan `ToastProvider` ada

### Issue 4: Component re-render berlebihan

**Cause:** queryKey yang tidak stable (object literal)
**Solution:** Pastikan queryKey adalah array, bukan object

### Issue 5: TypeScript errors di form

**Cause:** Schema validation mismatch
**Solution:** Pastikan Zod schema match dengan interface input

---

## 📖 Reference Documentation

- [React Query Docs](https://tanstack.com/query/latest)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Docs](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- FoodTrip Guidelines: See `/copilot-instructions.md`

---

## Questions?

Refer back to:

1. Existing features di `apps/admin/src/features/` (reference implementations)
2. FoodTrip guidelines di `.github/copilot-instructions.md`
3. Type definitions di `packages/types/`
