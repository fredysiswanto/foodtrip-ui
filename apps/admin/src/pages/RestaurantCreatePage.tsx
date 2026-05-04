// import { useNavigate } from 'react-router-dom';
// import { useCreateRestaurant } from '../features/restaurant';
// import { RestaurantForm } from '../features/restaurant/components';
// import { Button, Card, VStack } from '@foodtrip/ui';

// export function RestaurantCreatePage() {
//   const navigate = useNavigate();
//   const { mutate: createRestaurant, isPending } = useCreateRestaurant();

//   const handleSubmit = async (data: any) => {
//     createRestaurant(data, {
//       onSuccess: () => {
//         navigate('/admin/restaurants');
//       },
//     });
//   };

//   return (
//     <VStack gap="lg">
//       <div>
//         <Button variant="ghost" onClick={() => navigate('/admin/restaurants')}>
//           ← Back to Restaurants
//         </Button>
//         <h1 className="text-3xl font-bold text-gray-900 mt-4">
//           Create New Restaurant
//         </h1>
//       </div>

//       <Card>
//         <RestaurantForm
//           onSubmit={handleSubmit}
//           isLoading={isPending}
//         />
//       </Card>
//     </VStack>
//   );
// }
