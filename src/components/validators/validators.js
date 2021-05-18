export const validateStringLength = function(value){
    if(value==undefined|| value.replace(' ','').length<=0){
        return false;
    }
    return true;

}