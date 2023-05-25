export default function setLocalStorageFields(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}