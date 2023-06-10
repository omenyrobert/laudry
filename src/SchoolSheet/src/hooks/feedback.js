
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const useFeedback = () => {

  const toggleFeedback = (status, message = null) => {
    const MySwal = withReactContent(Swal);
    if (message === null) {
      MySwal.fire({
        icon: status,
        showConfirmButton: false,
        timer: 500,
      });
    } else {
      MySwal.fire({
        icon: status,
        title: message.title,
        text: message.text,
      });
    }
  }

  return { toggleFeedback }
}