/**
 * If you want to enable logs set it to `true`
 */
import CONFIG from '@/config'

export function logMessage(message) {
    if (CONFIG.IS_LOGGER_ENABLED) {
        var now = new Date();
        console.log(now.toLocaleTimeString() + "." + now.getMilliseconds() + "> " + message);
    }
}
export function getErrorMessage(error) {
    if (error === undefined) {
        return '';
    }
    else if (typeof error === 'string') {
        return error;
    }
    return error.message;
}