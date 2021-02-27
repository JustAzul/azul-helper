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
                    Filepath,
                },
            };
            const worker = new worker_threads_1.Worker(__filename, o);
            worker.once('error', (e) => {
                worker.unref();
                reject(e);
            });
            worker.once('message', (Response) => {
                worker.unref();
                resolve(Response);
            });
        });
    }
    return SyncReadJson_1.default(Filepath);
};
if (!worker_threads_1.isMainThread) {
    (async () => {
        const Result = await Read(worker_threads_1.workerData.Filepath);
        worker_threads_1.parentPort?.postMessage(Result);
    })();
}
exports.default = Read;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZEpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVhZEpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtREFFd0I7QUFHeEIsa0VBQTBDO0FBRTFDLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxRQUFrQixFQUFtQixFQUFFO0lBQ3pELElBQUksNkJBQVksRUFBRTtRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxHQUFHO2dCQUNSLFVBQVUsRUFBRTtvQkFDVixRQUFRO2lCQUNUO2FBRUYsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksdUJBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFekMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDekIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNmLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLHNCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBRUYsSUFBSSxDQUFDLDZCQUFZLEVBQUU7SUFDakIsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNWLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsMkJBQVUsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUNOO0FBRUQsa0JBQWUsSUFBSSxDQUFDIn0=