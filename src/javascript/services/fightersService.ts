import callApi from '../helpers/apiHelper';

export interface Fighter {
    '_id': string;
    name: string;
    'health': number;
    'attack': number;
    'defense': number;
    'source': string;
}

export type FighterPosition = 'left' | 'right';

class FighterService {
    #endpoint = 'fighters.json';

    #fighterEndpoint = 'details/fighter/id.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id: string): Promise<Fighter> {
        try {
            const fighterEndpoint = this.resolveFighterEndpoint(id);
            const apiResult = await callApi(fighterEndpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    resolveFighterEndpoint(id: string): string {
        return this.#fighterEndpoint.replace('id', id);
    }
}

const fighterService = new FighterService();

export default fighterService;
