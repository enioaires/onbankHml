import { fetchFactory } from '../utils/fetch';
const api = fetchFactory('https://api.onbank.digital');
api.setHeader('Onbank-Api-Access-Key', 'fcd3f2ec-9bed-4f23-b2bb-0e4a8f5c4649');
api.setHeader('hAuthorization', 'vhewfmweyw4yu7nyxw5bpuw4ft1+hud+dc1rnis4taejc=');

export default api;
