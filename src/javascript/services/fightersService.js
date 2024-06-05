import callApi from '../helpers/apiHelper';

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

    async getFighterDetails(id) {
        try {
            const fighterEndpoint = this.resolveFighterEndpoint(id);
            const apiResult = await callApi(fighterEndpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    resolveFighterEndpoint(id) {
        return this.#fighterEndpoint.replace('id', id);
    }
}

const fighterService = new FighterService();

export default fighterService;
