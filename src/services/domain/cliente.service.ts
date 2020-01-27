import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storage: StorageService
    ) {}

    findByEmail(email: String) : Observable<ClienteDTO> {
        return this.http
            .get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`)
    }

    getImageFromBucket(id: String) : Observable<any> {
        //let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        let url = `${API_CONFIG.bucketBaseUrl}/avatar-blank.png`;
        return this.http
            .get(url, { responseType: 'blob' });
    }

    insert(cliente: ClienteDTO) {
        return this.http
            .post(`${API_CONFIG.baseUrl}/clientes`,
            cliente,
            {
                observe: 'response',
                responseType: 'text'
            })
    }
}