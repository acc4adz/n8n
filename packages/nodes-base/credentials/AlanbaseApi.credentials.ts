import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AlanbaseApi implements ICredentialType {
	name = 'alanbaseApi';

	displayName = 'Alanbase API';

	documentationUrl = 'alanbase';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API Key for Alanbase API authentication',
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://api.alanbase.com/v1',
			required: true,
			description: 'The URL to the Alanbase API',
		},
	];
}
