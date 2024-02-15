import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
function useHandleDeleteItem({
    title,
    id,
    funDelete,
    funReload
}){
    const dispatch = useDispatch();
    const [t] = useTranslation("global");
    console.log(2);
    Swal.fire({
        title: title,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: t("delete"),
        denyButtonText: t("cancel"),
      }).then((result) => {
        console.log(3);
        if (result.isConfirmed) {
            dispatch(funDelete(id))
            .then((response)=>{
                if(response.payload.delete){
                    Swal.fire({
                        title:t("successfully-removed"),
                        icon:'success'
                    });
                    funReload();
                    return false;
                }
                Swal.fire({
                    title:t("something-went-wrong"),
                    icon:"error"
                });
            })
        }
    });
}
export default useHandleDeleteItem;