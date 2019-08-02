import { socket } from "./data.js";
var _ = require("lodash");

const state = {
    socket
};
function emit(action, data) {
    var _arr_emit = [action];
    if (data) {
        _arr_emit.push(data);
    }
    return JSON.stringify({
        emit: _arr_emit
    });
}
function socketAction(socketHandler, storeHandler, action, data) {
    switch (action) {
        case "init":
            break;
        case "client-ping":
            socketHandler.send(
                emit("client-pong", {
                    serverTime: data.serverTime,
                    clientTime: _.now()
                })
            );
            break;
        case "client-latency":
            break;
        case "level":
            storeHandler.dispatch("updateLevel", data);
            break;
        case "pending":
            storeHandler.dispatch("updatePending", data);
            break;
        case "codag":
            storeHandler.dispatch("updateCodag", data);
            break;
        case "history":
            data.forEach(levelInfo => {
                let blocks = levelInfo.blocks,
                    level = {
                        number: levelInfo.number,
                        blockHashes: []
                    };
                blocks.map(block => {
                    level.blockHashes.push(block.hash);
                    block.levelNumber = levelInfo.number;
                    return block;
                });
                storeHandler.dispatch("updateBlocks", blocks);
                storeHandler.dispatch("updateLevel", level);
            });
            break;
        case "blocks":
            storeHandler.dispatch("updateBlocks", data);
            break;
    }
}
const mutations = {
    SOCKET_ONOPEN(state, event) {
        this._vm.$socket.send(emit("ready"));
        state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state, event) {
        state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
        state.socket.isConnected = false;
    },
    SOCKET_ONMESSAGE(state, event) {
        var message = event.data;
        message = JSON.parse(message);
        if (message.emit) {
            let emit_info = message.emit;
            message = {
                action: emit_info[0],
                data: emit_info[1]
            };
        }
        socketAction(this._vm.$socket, this, message.action, message.data);
        state.socket.message = message;
    },
    SOCKET_RECONNECT(state, count) {},
    SOCKET_RECONNECT_ERROR(state) {
        state.socket.reconnectError = true;
    }
};

const actions = {};

export default {
    state,
    actions,
    mutations
};
