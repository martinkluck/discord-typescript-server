"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactor = exports.Reactor = void 0;
const ACK_REACTIONS = ['👍', '🎮', '💚', '🍜'];
const EXPIRED_REACTIONS = ['🖤'];
const FAILURE_REACTIONS = ['⛔', '🚱'];
/** Gets a random element of an array. */
const getRandom = (array) => array[Math.floor(Math.random() * array.length)];
class Reactor {
    constructor(enableReactions) {
        this.enableReactions = enableReactions;
    }
    /** Indicates to the user that the command was executed successfully. */
    success(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.enableReactions)
                return;
            yield message.react(getRandom(ACK_REACTIONS));
        });
    }
    /** Indicates to the user that the command failed for some reason. */
    failure(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.enableReactions)
                return;
            yield message.reactions.removeAll();
            yield message.react(getRandom(FAILURE_REACTIONS));
        });
    }
    /** Indicates to the user that the command is no longer active, as intended. */
    expired(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.enableReactions)
                return;
            yield message.reactions.removeAll();
            yield message.react(getRandom(EXPIRED_REACTIONS));
        });
    }
}
exports.Reactor = Reactor;
exports.reactor = new Reactor(process.env.ENABLE_REACTIONS === 'true' || true);
//# sourceMappingURL=reactor.js.map