"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoPatternService = void 0;
const pattern_service_1 = require("./pattern.service");
class AutoPatternService {
    static analyze(data) {
        const allPatterns = pattern_service_1.PatternService.analyze(data);
        return allPatterns
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 3); // Return top 3 most confident patterns
    }
}
exports.AutoPatternService = AutoPatternService;
