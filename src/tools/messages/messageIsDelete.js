import Swal from 'sweetalert2';
export default function messageIsDelete({
    titleMessage,
    textDelete,
    textCancel,
    funDelete,
    funGetData,
    messageSuccess,
    messageError
}) {
    Swal.fire({
        title: titleMessage,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: textDelete,
        denyButtonText: textCancel,
        confirmButtonColor: '#D32F2F',
        denyButtonColor: '#3085d6',
        icon:"warning"
    }).then((result) => {
        if (result.isConfirmed) {
            funDelete()
                .then((response) => {
                    if (response.payload.delete) {
                        Swal.fire({
                            title: messageSuccess,
                            icon: 'success'
                        });
                        funGetData();
                    } else {
                        Swal.fire({
                            title: messageError,
                            icon: "error"
                        });
                    }
                })
        }
    });
}