
import { Result } from "../../../../core/logic/Result";

export interface ITransactionManager {
    run<T>(callback: () => Promise<T>): Promise<T>;
}
