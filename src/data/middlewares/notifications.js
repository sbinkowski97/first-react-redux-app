import { toast } from "react-toastify";
const notificationsMiddleware = () => (next) => (action) => {
  if (action.successMessage && /(.*)_(SUCCESS)/.test(action.type)) {
    //shownotification
    toast.success(action.successMessage);
  }
  next(action);
};

export default notificationsMiddleware;
