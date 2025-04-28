import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from 'rxjs'

export class CustomInterceptors implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
    console.log('Before...');

    return handler.handle().pipe(
      map((items) => {
        const data = {
          data: items
        }
        return data
      }
      )
    )
  }
}

