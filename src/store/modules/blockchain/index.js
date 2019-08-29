import {
    levels,
    blocks,
    transactions,
    lastLevel,
    lastBlock,
    lastLevelUpdate,
    codagData,
    codagLinks,
    codagLevels,
    firstLevel,
    pending,
    blockDetail
} from "./data";

function isExist(arrJson, keyvalue, key) {
    let _is_exist = false;
    arrJson.some((v, i, _a) => {
        _is_exist = v[key] == keyvalue;
        return _is_exist;
    });
    return _is_exist;
}
function indexArray(array, targetVal, key = "") {
    return key == "" ? array.findIndex(value => value == targetVal) : array.findIndex(value => value[key] == targetVal);
}
function equals(x, y) {
    if (x === y) {
        return true;
    }
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }
    if (x.constructor !== y.constructor) {
        return false;
    }
    for (var p in x) {
        if (x.hasOwnProperty(p)) {
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            if (x[p] === y[p]) {
                continue;
            }
            if (typeof x[p] !== "object") {
                return false;
            }
            if (!equals(x[p], y[p])) {
                return false;
            }
        }
    }
    for (p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const state = {
    levels: levels,
    blocks: blocks,
    transactions: transactions,
    lastBlock: lastBlock,
    lastLevel: lastLevel,
    firstLevel: firstLevel,
    lastLevelUpdate: lastLevelUpdate,
    codagLinks: codagLinks,
    codagData: codagData,
    codagLevels: codagLevels,
    pending: pending,
    blockDetail: blockDetail
};

// getters
const getters = {
    levels: state => {
        return state.levels;
    },
    blocks: state => {
        return state.blocks;
    },
    blocksList: state => {
        return state.blocksList;
    },
    transactions: state => {
        return state.transactions;
    },
    lastLevel: state => {
        return state.lastLevel;
    },
    firstLevel: state => {
        return state.firstLevel;
    },
    lastBlock: state => {
        return state.lastBlock;
    },
    codagLinks: state => {
        return state.codagLinks;
    },
    codagData: state => {
        return state.codagData;
    },
    codagLevels: state => {
        return state.codagLevels;
    },
    pending: state => {
        return state.pending;
    },
    blockDetail: state => {
        return state.blockDetail;
    }
};

// actions
const actions = {
    changeLastLevel(payload) {
        context.commit("changeLastLevel", payload);
    },
    getBlock(context, payload) {
        context.commit("getBlock", payload);
    },
    addBlock(context, payload) {
        context.commit("addBlock", payload);
    },
    addTransactions(context, payload) {
        payload.forEach(transaction => {
            context.commit("addTransaction", transaction);
        });
    },
    isLastLevel(payload) {
        return payload.number != state.lastLevel.number;
    },
    updateLevel(context, payload) {
        if (actions.isLastLevel(payload)) {
            context.commit("changeLastLevel", payload);
        }
        context.commit("changeFirstLevel", payload);
        context.commit("addLevel", payload);
    },
    updateBlocks(context, blocks) {
        blocks.forEach((block, index) => {
            block.index = index;
            this.dispatch("addBlock", block);
            this.dispatch("addTransactions", block.transactions);
        });
    },
    updatePending(context, blocks) {
        context.commit("updatePending", blocks);
        // blocks.forEach((block,index)=>{
        //     block.index = index;
        //     this.dispatch("addBlock",block);
        //     this.dispatch("addTransactions",block.transactions);
        // })
    },
    updateCodag(context, codag) {
        context.commit("updateCodag", codag);
    }
};

const mutations = {
    changeLastLevel(state, payload) {
        state.lastLevel = payload;
    },
    changeFirstLevel(state, payload) {
        if (state.firstLevel.number < 0) {
            state.firstLevel = payload;
        }
    },
    addBlock(state, payload) {
        if (!isExist(state.blocks, payload.hash, "hash")) {
            state.blocks.unshift(payload);
            state.blocks = state.blocks.slice(0, 15);
            //toCodag(payload, state, false);
        }
    },
    getBlock(context, payload) {
        const bcHash = payload;
        const dataIndex = indexArray(state.blocks, bcHash, "hash");
        if (dataIndex >= 0) {
            let blockDetail = state.blocks[dataIndex];
            delete blockDetail.index;
            delete blockDetail.number;
            delete blockDetail.transactionsRoot;
            delete blockDetail.txCount;
            state.blockDetail = blockDetail;
        } else {
            state.blockDetail = {};
        }
    },
    updatePending(state, blocks) {
        if (!equals(state.pending, blocks)) {
            state.pending = blocks;
            blocks.forEach((block, index) => {
                block.index = index;
                //toCodag(block, state, true);
            });
        }
    },
    updateCodag(state, codag) {
        state.codagData = codag.data;
        state.codagLinks = codag.links;
        state.codagLevels = codag.levels;
    },
    addLevel(state, payload) {
        state.levels["level_" + payload.number] = payload;
    },
    addTransaction(state, payload) {
        if (!isExist(state.transactions, payload.hash, "hash")) {
            state.transactions.unshift(payload);
            state.transactions = state.transactions.slice(0, 20);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
