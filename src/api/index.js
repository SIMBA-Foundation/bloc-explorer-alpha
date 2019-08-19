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
    },
    getBlocks(params, callback) {
        post("/", {
            method: "getBlocks",
            params: {
                pageSize: params.pageSize || 20,
                pageNum: params.pageNum
            },
            id: new Date().getTime()
        }).then(res => {
            callback.call(null, res.data);
        });
    },
    getTransactions(params, callback) {
        post("/", {
            method: "getTransactions",
            params: {
                pageSize: params.pageSize || 20,
                pageNum: params.pageNum
            },
            id: new Date().getTime()
        }).then(res => {
            callback.call(null, res.data);
        });
    },
    getTransaction(hash, callback) {
        post("/", {
            method: "getTransaction",
            params: {
                hash: hash
            },
            id: new Date().getTime()
        }).then(res => {
            callback.call(null, res.data);
        });
    },
    getLevels(params, callback) {
        post("/", {
            method: "getLevels",
            params: {
                pageSize: params.pageSize || 20,
                pageNum: params.pageNum
            },
            id: new Date().getTime()
        }).then(res => {
            callback.call(null, res.data);
        });
    },
    getAddress(hash, callback) {
        post("/", {
            method: "getAddress",
            params: {
                hash: hash
            },
            id: new Date().getTime()
        }).then(res => {
            callback.call(null, res.data);
        });
    },
    search(keyword, callback) {
        post("/", {
            method: "search",
            params: {
                keyword: keyword
            },
            id: new Date().getTime()
        }).then(res => {
            callback.call(null, res.data);
        });
    }
};
