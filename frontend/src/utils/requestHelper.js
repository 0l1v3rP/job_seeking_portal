import { toastTypeEnum } from "./constants/toastType";

export const responseRequestHelper = async (requestAction, additionalOkAction, succesMessage, addToast) => {
    try{
        const response = await requestAction();
        if (response.ok) {
            await additionalOkAction();
            console.log(succesMessage); 
            addToast(succesMessage, 'Success', toastTypeEnum.SUCCESS);
        } else {
            const errorData = await response.json();
            console.error(errorData.error);
            addToast(errorData.error, 'Error', toastTypeEnum.DANGER);
        }
    } catch (error) {
        console.error(error.message);
        addToast(error.message, 'Error',  toastTypeEnum.DANGER);
    }
}
