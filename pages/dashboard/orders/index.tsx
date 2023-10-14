import MainLayout from '../../../components/Layout/MainLayout';
import withAuth from '../../../helpers/withAuth';

import OrderHistory from '../../../modules/dashboard/component/order/OrderHistory/OrderHistory';

const Orders: React.FC = () => {
  return (
    <>
      <MainLayout activePage="orders" showDashboardSidebar={true} showTopbar={true}>
        <div className="w-full">
          <OrderHistory />
        </div>
      </MainLayout>
    </>
  );
};

export default withAuth(Orders);
