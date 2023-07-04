import { Observable } from 'rxjs';

export interface TerminalService {
  question(text: string): Observable<string>;

  close(): void;
}
