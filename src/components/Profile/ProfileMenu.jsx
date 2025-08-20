import React from 'react';
import { 
  CreditCard, 
  Warehouse, 
  Info, 
  Gift, 
  ChevronRight, 
  LogOut,
  MapPin
} from 'lucide-react';

const ProfileMenu = ({ onLogoutClick }) => {
  const menuItems = [
    {
      id: 'payment',
      to: '/payment-method',
      icon: CreditCard,
      title: 'Payment Method',
      iconColor: 'text-primary'
    },
    {
      id: 'warehouse',
      to: '/update-warehouse',
      icon: Warehouse,
      title: 'Create/Update Warehouse',
      iconColor: 'text-info'
    },
    {
      id: 'info',
      to: '/view-info',
      icon: Info,
      title: 'View More Info',
      iconColor: 'text-warning'
    },
    {
      id: 'address',
      to: '/shipping',
      icon: MapPin,
      title: 'Address',
      iconColor: 'text-secondary'
    }
  ];

  return (
    <div className="bg-white rounded-3  border-0 overflow-hidden">
      <style>
        {`
          .menu-item {
            transition: background-color 0.2s ease;
            cursor: pointer;
          }
          
          .menu-item:hover {
            background-color:rgb(165, 221, 189) !important;
          }
          
          .logout-item {
            transition: background-color 0.2s ease;
            cursor: pointer;
          }
          
          .logout-item:hover {
              background-color:rgb(248, 82, 82) !important;
          }
          
          .refer-card {
            background: linear-gradient(135deg,rgb(60, 175, 87) 0%,rgb(166, 177, 174) 100%);
          }
        `}
      </style>

      <div className="list-group list-group-flush">
        {/* Regular Menu Items */}
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a key={item.id} href={item.to} className="text-decoration-none">
              <div className="list-group-item menu-item d-flex justify-content-between align-items-center px-4 py-3 border-bottom border-light">
                <div className="d-flex align-items-center ">
                  <div className={`me-3 ${item.iconColor}`}>
                    <IconComponent size={20} />
                  </div>
                  <span className="text-dark fw-medium mx-3" >
                    {item.title}
                  </span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </div>
            </a>
          );
        })}

        {/* Refer & Earn Card */}
        <div className="p-3">
          <div className="refer-card rounded-3 p-3 text-white">
            <div className="d-flex align-items-center">
              <Gift size={20} className="me-3" />
              <div className="flex-grow-1 mx-2 ">
                <div className="fw-semibold small">Refer & Earn ₹50!</div>
                <div className="small opacity-90">Refer & Invite your friend</div>
              </div>
              <ChevronRight size={16} className="text-white-50" />
            </div>
          </div>
          <div className="text-center mt-2">
            <a href="#" className="text-success text-decoration-none small">
              View my referrals
            </a>
          </div>
        </div>

        {/* Logout Item */}
        <div 
          className="list-group-item logout-item d-flex justify-content-between align-items-center px-4 py-3 border-0"
          onClick={onLogoutClick}
        >
          <span className="text-dark fw-medium">Logout</span>
          <LogOut size={18} className="text-muted" />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;