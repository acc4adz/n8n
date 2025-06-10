import { NodeApiError } from 'n8n-workflow';
import type {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IRequestOptions,
	IHttpRequestMethods,
} from 'n8n-workflow';

export interface AlanbaseApiRequestOptions {
	method: IHttpRequestMethods;
	endpoint: string;
	body?: IDataObject;
	query?: IDataObject;
}

/**
 * Make an API request to Alanbase
 */
export async function alanbaseApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	options: AlanbaseApiRequestOptions,
) {
	const credentials = await this.getCredentials('alanbaseApi');

	console.log(`Making Alanbase API request to: ${options.endpoint}`);

	const requestOptions: IRequestOptions = {
		method: options.method,
		headers: {
			'Content-Type': 'application/json',
			'API-KEY': credentials.apiKey as string,
		},
		uri: `${credentials.apiUrl as string}${options.endpoint}`,
		json: true,
	};

	if (options.body && Object.keys(options.body).length > 0) {
		requestOptions.body = options.body;
	}

	if (options.query && Object.keys(options.query).length > 0) {
		requestOptions.qs = options.query;
	}

	try {
		console.log('Alanbase request options:', {
			method: options.method,
			endpoint: options.endpoint,
			qs: options.query ? Object.keys(options.query) : 'none',
			body: options.body ? Object.keys(options.body) : 'none',
		});
		return await this.helpers.request(requestOptions);
	} catch (error) {
		console.error('Alanbase API request error:', error);
		if (error.statusCode === 401) {
			throw new NodeApiError(this.getNode(), error, {
				message: 'The Alanbase API Key is not valid',
			});
		}

		throw new NodeApiError(this.getNode(), error);
	}
}
