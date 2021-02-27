"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graceful_fs_1 = require("graceful-fs");
const Read = async (Filepath) => {
    if (!graceful_fs_1.existsSync(Filepath))
        return {};
    const fileData = graceful_fs_1.readFileSync(Filepath, 'utf-8');
    try {
        const ParsedData = JSON.parse(fileData);
        return ParsedData;
    }
    catch {
        return {};
    }
};
exports.default = Read;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3luY1JlYWRKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1N5bmNSZWFkSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFpRTtBQUVqRSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsUUFBa0IsRUFBRSxFQUFFO0lBQ3hDLElBQUksQ0FBQyx3QkFBVSxDQUFDLFFBQVEsQ0FBQztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBRXJDLE1BQU0sUUFBUSxHQUFHLDBCQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRWpELElBQUk7UUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0lBQUMsTUFBTTtRQUNOLE9BQU8sRUFBRSxDQUFDO0tBQ1g7QUFDSCxDQUFDLENBQUM7QUFFRixrQkFBZSxJQUFJLENBQUMifQ==