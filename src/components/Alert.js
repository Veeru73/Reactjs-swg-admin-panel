import toastr from 'toastr';

export const successAlert = (msg ='No Msg')=> {
    toastr.options = {
        positionClass: 'toast-top-right',
        closeButton: true,
        timeOut: 5000, // Set the timeout to 0 to make notifications stay indefinitely
        toastClass:"animate__animated animate__bounceInRight"
        
      };
    toastr.success(msg);
  }

    //successAlert for fire toast/...
   export const errorAlert = (msg ='No Msg') =>{
    
    toastr.options = {
      positionClass: 'toast-top-right',
      closeButton: true,
      timeOut: 5000, // Set the timeout to 0 to make notifications stay indefinitely
      toastClass:"animate__animated animate__bounceInRight"
    };
    toastr.error(msg);
  }