import Swal from 'sweetalert2';

export const singleButtonSwal = Swal.mixin({
  customClass: {
    confirmButton: '!bg-blue-500 !text-white !shadow-none'
  }
});

export const yesNoSwal = Swal.mixin({
  customClass: {
    confirmButton: '!bg-red-500 !text-white !shadow-none',
    cancelButton: '!bg-slate-500 !text-white !shadow-none'
  }
});
