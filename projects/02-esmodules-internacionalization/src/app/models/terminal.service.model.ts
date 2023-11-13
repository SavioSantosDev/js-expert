import { Observable } from 'rxjs';

export interface TerminalService {
  question(text: string): Observable<string>;

  confirm(text: string): Observable<boolean>;

  close(): void;
}
