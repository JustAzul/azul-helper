"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const SyncReadJson_1 = __importDefault(require("./SyncReadJson"));
const Read = async (Filepath) => {
    if (worker_threads_1.isMainThread) {
        return new Promise((resolve, reject) => {
            const o = {
                workerData: {
                    Filepath
                }
            };
            const worker = new worker_threads_1.Worker(__filename, o);
            worker.once("error", e => {
                worker.unref();
                reject(e);
            });
            worker.once("message", Response => {
                worker.unref();
                resolve(Response);
            });
        });
    }
    else {
        return SyncReadJson_1.default(Filepath);
    }
};
if (!worker_threads_1.isMainThread) {
    (async () => {
        const Result = await Read(worker_threads_1.workerData.Filepath);
        worker_threads_1.parentPort?.postMessage(Result);
    })();
}
exports.default = Read;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZEpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVhZEpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtREFBNEU7QUFFNUUsa0VBQTBDO0FBRTFDLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxRQUFrQixFQUFtQixFQUFFO0lBRXZELElBQUcsNkJBQVksRUFBRTtRQUViLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsTUFBTSxDQUFDLEdBQUc7Z0JBQ04sVUFBVSxFQUFFO29CQUNSLFFBQVE7aUJBQ1g7YUFFSixDQUFDO1lBRUYsTUFBTSxNQUFNLEdBQUcsSUFBSSx1QkFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDckIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQzlCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztLQUVOO1NBQU07UUFFSCxPQUFPLHNCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDakM7QUFDTCxDQUFDLENBQUM7QUFFRixJQUFHLENBQUMsNkJBQVksRUFBRTtJQUNkLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDUixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLDJCQUFVLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDUjtBQUVELGtCQUFlLElBQUksQ0FBQyJ9