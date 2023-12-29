import CryptoJS from 'crypto-js';
const key = 'PMBXDE9N53V89K65';

export const encryptGlobal = (data) => {
    try {
        const encryptedValue = CryptoJS.AES.encrypt(data, key).toString();
        const encoded = btoa(encryptedValue);
        return encoded;
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }
};

export const decryptGlobal = (data) => {
    try {
        const decoded = atob(data);
        const decryptValue = CryptoJS.AES.decrypt(decoded, key).toString(CryptoJS.enc.Utf8);
        return decryptValue;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};
