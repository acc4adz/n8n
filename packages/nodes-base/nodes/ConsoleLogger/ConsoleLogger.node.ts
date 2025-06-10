import {
	NodeConnectionTypes,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class ConsoleLogger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Console Logger',
		name: 'consoleLogger',
		icon: 'file:console.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'Simple Console Log',
		description: 'Logs input data to console',
		defaults: {
			name: 'Console Logger',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		properties: [
			{
				displayName: 'Log Message',
				name: 'logMessage',
				type: 'string',
				default: 'Input data logged to console',
				description: 'Message to display before the logged data',
			},
		],
	};

	// This function passes data through and logs to console
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Get the log message from the parameters
		const logMessage = this.getNodeParameter('logMessage', 0) as string;

		// Log the message and the input items
		console.log(`${logMessage}:`);
		console.log(JSON.stringify(items, null, 2));

		// Return the input items unchanged
		return [items];
	}
}
