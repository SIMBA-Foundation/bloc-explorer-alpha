import axios from "axios";
import serviceConfig from "../config";

const api = axios.create({
    baseURL: serviceConfig.api, //blockcloud blockchain api service
    headers: {
        "Content-Type": "text/plain",
        Accept: "application/json"
    }
});
function post(path, data) {
    return api.post(path, data).catch(error => {
        console.log(error);
    });
}
export default {
    getBlock(hash, callback) {
        post("/", {
            method: "getBlock",
            params: {
                hash: hash
            },
            id: new Date().getTime()
        }).then(res => {
            callback.call(null, res.data);
        });
    }
};
