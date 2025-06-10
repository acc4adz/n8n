import { NodeConnectionTypes } from 'n8n-workflow';
import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { alanbaseApiRequest } from './GenericFunctions';

export class Alanbase implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Alanbase',
		name: 'alanbase',
		icon: 'file:alanbase.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the Alanbase API',
		defaults: {
			name: 'Alanbase',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'alanbaseApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Health Check',
						value: 'healthcheck',
					},
					{
						name: 'Offer',
						value: 'offer',
					},
					{
						name: 'Partner',
						value: 'partner',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Promocode',
						value: 'promocode',
					},
					{
						name: 'Statistic',
						value: 'statistic',
					},
				],
				default: 'healthcheck',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['healthcheck'],
					},
				},
				options: [
					{
						name: 'Check API Health',
						value: 'healthcheck',
						action: 'Check API health',
						description: 'Check if the Alanbase API is working properly',
					},
				],
				default: 'healthcheck',
			},
			// ----------------------------------
			// STATISTIC OPERATIONS
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['statistic'],
					},
				},
				options: [
					{
						name: 'Get Common Statistics',
						value: 'getCommonStatistics',
						action: 'Get common statistics',
					},
					{
						name: 'Get Conversion By ID',
						value: 'getConversionById',
						action: 'Get a conversion by ID',
					},
					{
						name: 'Get Conversions',
						value: 'getConversions',
						action: 'Get conversions',
					},
				],
				default: 'getCommonStatistics',
			},

			// ----------------------------------
			// PRODUCT OPERATIONS
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
					},
				},
				options: [
					{
						name: 'Get Categories',
						value: 'getCategories',
						action: 'Get product categories',
					},
					{
						name: 'Get Goals',
						value: 'getGoals',
						action: 'Get product goals',
					},
					{
						name: 'Get Products',
						value: 'getProducts',
						action: 'Get products',
					},
				],
				default: 'getProducts',
			},

			// ----------------------------------
			// OFFER OPERATIONS
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['offer'],
					},
				},
				options: [
					{
						name: 'Create Landing Page',
						value: 'createLandingPage',
						action: 'Create landing page',
					},
					{
						name: 'Create Offer',
						value: 'createOffer',
						action: 'Create an offer',
					},
					{
						name: 'Create Offer Conditions',
						value: 'createOfferConditions',
						action: 'Create offer conditions',
					},
					{
						name: 'Get Offer By ID',
						value: 'getOfferById',
						action: 'Get an offer by ID',
					},
					{
						name: 'Get Offers',
						value: 'getOffers',
						action: 'Get offers',
					},
				],
				default: 'getOffers',
			},

			// ----------------------------------
			// OFFER LANDING PAGE PARAMETERS
			// ----------------------------------

			// Parameters for createLandingPage operation
			{
				displayName: 'Offer ID',
				name: 'offerId',
				type: 'string',
				required: true,
				default: '',
				description: 'The ID of the offer to create a landing page for',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createLandingPage'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the landing page',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createLandingPage'],
					},
				},
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				description: 'The URL of the landing page',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createLandingPage'],
					},
				},
			},
			{
				displayName: 'Target Link',
				name: 'target_link',
				type: 'string',
				required: true,
				default: '',
				description: 'The target link for the landing page',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createLandingPage'],
					},
				},
			},
			{
				displayName: 'Is Enabled',
				name: 'is_enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the landing page is enabled',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createLandingPage'],
					},
				},
			},

			{
				displayName: 'Partner IDs',
				name: 'partner_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of partner IDs or leave empty for null',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createLandingPage'],
					},
				},
			},

			// ----------------------------------
			// PARTNER OPERATIONS
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['partner'],
					},
				},
				options: [
					{
						name: 'Get Partners',
						value: 'getPartners',
						action: 'Get partners',
					},
				],
				default: 'getPartners',
			},

			// ----------------------------------
			// PROMOCODE OPERATIONS
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['promocode'],
					},
				},
				options: [
					{
						name: 'Get Promocodes',
						value: 'getPromocodes',
						action: 'Get promocodes',
					},
				],
				default: 'getPromocodes',
			},

			// ----------------------------------
			// QUERY PARAMETERS
			// ----------------------------------

			// Common parameters for all paginated endpoints
			{
				displayName: 'Query Parameters',
				name: 'queryParameters',
				type: 'collection',
				placeholder: 'Add Parameter',
				default: {},
				displayOptions: {
					show: {
						resource: ['statistic', 'product', 'offer', 'partner', 'promocode'],
					},
				},
				options: [
					// Common pagination parameters
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number to return',
					},
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						default: 15,
						description: 'Number of results per page',
					},

					// Date range filters
					{
						displayName: 'Date From',
						name: 'date_from',
						type: 'dateTime',
						default: '',
						description: 'Start date for filtering results (YYYY-MM-DD format)',
					},
					{
						displayName: 'Date To',
						name: 'date_to',
						type: 'dateTime',
						default: '',
						description: 'End date for filtering results (YYYY-MM-DD format)',
					},

					// Sorting
					{
						displayName: 'Sort By',
						name: 'sort_by',
						type: 'string',
						default: 'created_at',
						description: 'Field to sort results by',
					},
					{
						displayName: 'Sort Direction',
						name: 'sort_dir',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'desc',
						description: 'Direction to sort results',
					},

					// Filter parameters - Statistics
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Pending',
								value: 'pending',
							},
							{
								name: 'Approved',
								value: 'approved',
							},
							{
								name: 'Rejected',
								value: 'rejected',
							},
						],
						default: '',
						description: 'Filter by conversion status',
					},

					// Filter parameters - Products & Offers
					{
						displayName: 'Category ID',
						name: 'category_id',
						type: 'number',
						default: '',
						description: 'Filter by category ID',
					},
					{
						displayName: 'Advertiser ID',
						name: 'advertiser_id',
						type: 'number',
						default: '',
						description: 'Filter by advertiser ID',
					},

					// Filter parameters - Offers
					{
						displayName: 'Product ID',
						name: 'product_id',
						type: 'number',
						default: '',
						description: 'Filter by product ID',
					},
					{
						displayName: 'Active Only',
						name: 'active_only',
						type: 'boolean',
						default: true,
						description: 'Whether to show only active offers',
					},

					// Search parameter
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Search term to filter results',
					},
				],
			},

			// Parameters for specific statistics operations
			{
				displayName: 'Conversion ID',
				name: 'conversionId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['statistic'],
						operation: ['getConversionById'],
					},
				},
			},

			// Parameters for Product operations
			{
				displayName: 'Product ID',
				name: 'productId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['getGoals'],
					},
				},
			},

			// Parameters for Offer operations
			{
				displayName: 'Product ID',
				name: 'productId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOffer'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				description: 'Offer name. Min length 3 characters. Max length 128 characters',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOffer'],
					},
				},
			},
			{
				displayName: 'Target Link',
				name: 'target_link',
				type: 'string',
				required: true,
				default: '',
				description: 'Target link with macros. Max length 2000 characters.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOffer'],
					},
				},
			},
			{
				displayName: 'Tracking Domain ID',
				name: 'tracking_domain_id',
				type: 'number',
				required: true,
				default: 0,
				description: 'Tracking domain ID. You can only specify verified domains.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOffer'],
					},
				},
			},
			{
				displayName: 'Privacy Level',
				name: 'privacy_level',
				type: 'options',
				required: true,
				options: [
					{ name: 'Public', value: 1 },
					{ name: 'Private', value: 2 },
					{ name: 'Premoderate', value: 3 },
				],
				default: 1,
				description: 'Offer Privacy level: 1=public, 2=private, 3=premoderate',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOffer'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOffer'],
					},
				},
				options: [
					// Optional parameters
					{
						displayName: 'Poster',
						name: 'poster',
						type: 'string',
						default: '',
						description: 'Offer poster image URL string. Available only from cdn.alanbase.com.',
					},
					{
						displayName: 'Hold Period',
						name: 'hold_period',
						type: 'number',
						default: 0,
						description: 'Conversion hold period in days',
					},
					{
						displayName: 'Descriptions',
						name: 'descriptions',
						type: 'string',
						default: '',
						description: 'Offer descriptions in different languages (JSON array of objects)',
					},
					{
						displayName: 'Postclick',
						name: 'postclick',
						type: 'number',
						default: 0,
						description: 'Postclick value in days',
					},
					{
						displayName: 'Postclick From',
						name: 'postclick_from',
						type: 'number',
						default: 0,
						description: 'Goal or click from which postclick is calculated',
					},
					{
						displayName: 'Trafficback Url',
						name: 'trafficback_url',
						type: 'string',
						default: '',
						description: 'Trafficback URL with macros. Max length 2000 characters.',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Comma-separated list of tag IDs (will be converted to array)',
					},
				],
			},
			{
				displayName: 'Offer ID',
				name: 'offerId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['getOfferById', 'createOfferConditions'],
					},
				},
			},

			// Parameters for Offer Conditions
			{
				displayName: 'Country Codes',
				name: 'country_codes',
				type: 'string',
				default: '',
				required: true,
				description: 'List of ISO country codes (comma-separated)',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'City IDs',
				name: 'city_ids',
				type: 'string',
				default: 'All',
				description:
					'List of cities identifiers (comma-separated). Enter "All" to select all cities.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'OS Type IDs',
				name: 'os_type_ids',
				type: 'string',
				default: 'All',
				description:
					'List of operating systems identifiers (comma-separated). Enter "All" to select all operating systems.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'Device Type IDs',
				name: 'device_type_ids',
				type: 'string',
				default: 'All',
				description:
					'List of device types identifiers (comma-separated). Enter "All" to select all device types.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'Payment Type',
				name: 'payment_type',
				type: 'options',
				options: [
					{ name: 'Percent', value: 0 },
					{ name: 'Fixed', value: 1 },
				],
				default: 1,
				required: true,
				description: 'Type of payment (0=percent, 1=fixed)',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'Payout Value',
				name: 'payout_value',
				type: 'number',
				default: 0,
				description: 'Payout value for partner. Required if no condition_payouts.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'Payout Currency',
				name: 'payout_currency',
				type: 'options',
				options: [
					{ name: 'USD', value: 'USD' },
					{ name: 'EUR', value: 'EUR' },
				],
				default: 'EUR',
				required: true,
				description: 'Payout ISO currency code. This currency is used for percent payment type.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'Revenue Value',
				name: 'revenue_value',
				type: 'number',
				default: 0,
				description: 'Revenue value from advertiser. Required if no condition_payouts.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'Revenue Currency',
				name: 'revenue_currency',
				type: 'options',
				options: [
					{ name: 'USD', value: 'USD' },
					{ name: 'EUR', value: 'EUR' },
				],
				default: 'EUR',
				required: true,
				description:
					'Revenue ISO currency code. This currency does not used for percent payment type.',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'Goals',
				name: 'goals',
				type: 'multiOptions',
				options: [
					{ name: 'FTD', value: 'ftd' },
					{ name: 'Registration', value: 'registration' },
					{ name: 'Commission', value: 'commission' },
				],
				default: [],
				description: 'Select goals to apply to the offer condition',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},
			{
				displayName: 'Is Partner Hidden',
				name: 'is_partner_hidden',
				type: 'boolean',
				default: false,
				description: 'Whether the condition is hidden from partner',
				displayOptions: {
					show: {
						resource: ['offer'],
						operation: ['createOfferConditions'],
					},
				},
			},

			// Parameters specific to statistics operations
			{
				displayName: 'Statistics Options',
				name: 'statisticsOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['statistic'],
						operation: ['getCommonStatistics', 'getConversions'],
					},
				},
				options: [
					{
						displayName: 'Group By',
						name: 'group_by',
						type: 'options',
						options: [
							{
								name: 'Day',
								value: 'day',
							},
							{
								name: 'Week',
								value: 'week',
							},
							{
								name: 'Month',
								value: 'month',
							},
							{
								name: 'Year',
								value: 'year',
							},
						],
						default: 'day',
						description: 'Group statistics by time period',
					},
					{
						displayName: 'Include Details',
						name: 'with_details',
						type: 'boolean',
						default: false,
						description: 'Whether to include detailed information in results',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		// Get optional query parameters
		let queryParameters = {};
		if (resource !== 'healthcheck') {
			queryParameters = this.getNodeParameter('queryParameters', 0, {}) as IDataObject;
		}

		// For each item
		for (let i = 0; i < items.length; i++) {
			try {
				// HEALTHCHECK
				if (resource === 'healthcheck') {
					if (operation === 'healthcheck') {
						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: '/v1/healthcheck',
						})) as IDataObject;
						returnData.push(responseData);
					}
				}

				// STATISTIC
				if (resource === 'statistic') {
					// Get statistics-specific options if available
					const statisticsOptions = this.getNodeParameter(
						'statisticsOptions',
						0,
						{},
					) as IDataObject;
					const apiQueryParams = { ...queryParameters, ...statisticsOptions };

					if (operation === 'getCommonStatistics') {
						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: '/v1/admin/statistic/common',
							query: apiQueryParams,
						})) as IDataObject;
						returnData.push(responseData);
					}

					if (operation === 'getConversionById') {
						const conversionId = this.getNodeParameter('conversionId', 0);

						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: `/v1/admin/statistic/conversions/${conversionId}`,
							query: apiQueryParams,
						})) as IDataObject;
						returnData.push(responseData);
					}

					if (operation === 'getConversions') {
						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: '/v1/admin/statistic/conversions',
							query: apiQueryParams,
						})) as IDataObject;
						returnData.push(responseData);
					}
				}

				// PRODUCT
				if (resource === 'product') {
					if (operation === 'getCategories') {
						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: '/v1/admin/products/categories',
							query: queryParameters,
						})) as IDataObject;
						returnData.push(responseData);
					}

					if (operation === 'getGoals') {
						const productId = this.getNodeParameter('productId', 0);

						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: `/v1/admin/products/${productId}/goals`,
							query: queryParameters,
						})) as IDataObject;
						returnData.push(responseData);
					}

					if (operation === 'getProducts') {
						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: '/v1/admin/products',
							query: queryParameters,
						})) as IDataObject;
						returnData.push(responseData);
					}
				}

				// OFFER
				if (resource === 'offer') {
					if (operation === 'createOffer') {
						// Get required parameters
						const productId = this.getNodeParameter('productId', 0);
						const name = this.getNodeParameter('name', 0);
						const targetLink = this.getNodeParameter('target_link', 0);
						const trackingDomainId = this.getNodeParameter('tracking_domain_id', 0);
						const privacyLevel = this.getNodeParameter('privacy_level', 0);

						// Get optional parameters
						const additionalOptions = this.getNodeParameter(
							'additionalOptions',
							0,
							{},
						) as IDataObject;

						// Build request body with required and optional parameters
						const body = {
							name,
							target_link: targetLink,
							tracking_domain_id: trackingDomainId,
							privacy_level: privacyLevel,
							...additionalOptions,
						};

						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'POST',
							endpoint: `/v1/admin/products/${productId}/offers`,
							body,
						})) as IDataObject;
						returnData.push(responseData);
					}

					if (operation === 'getOfferById') {
						const offerId = this.getNodeParameter('offerId', 0);

						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: `/v1/admin/offers/${offerId}`,
							query: queryParameters,
						})) as IDataObject;
						returnData.push(responseData);
					}

					if (operation === 'createOfferConditions') {
						const offerId = this.getNodeParameter('offerId', 0);

						// Get all required parameters
						const countryCodesStr = this.getNodeParameter('country_codes', 0) as string;
						// Handle payment_type with proper type conversion
						const paymentTypeValue = this.getNodeParameter('payment_type', 0);
						const paymentType =
							typeof paymentTypeValue === 'string'
								? parseInt(paymentTypeValue, 10)
								: Number(paymentTypeValue);
						const payoutCurrency = this.getNodeParameter('payout_currency', 0) as string;
						const revenueCurrency = this.getNodeParameter('revenue_currency', 0) as string;

						// Get optional parameters
						const cityIdsStr = this.getNodeParameter('city_ids', 0, '') as string;
						const osTypeIdsStr = this.getNodeParameter('os_type_ids', 0, '') as string;
						const deviceTypeIdsStr = this.getNodeParameter('device_type_ids', 0, '') as string;
						const payoutValue = this.getNodeParameter('payout_value', 0, 0) as number;
						const revenueValue = this.getNodeParameter('revenue_value', 0, 0) as number;
						// Get goals parameter - handle both array and comma-separated string formats
						const goalsParam = this.getNodeParameter('goals', 0, []);
						// Convert to array if it's a string
						const goals =
							typeof goalsParam === 'string'
								? goalsParam.split(',').map((goal) => goal.trim())
								: Array.isArray(goalsParam)
									? goalsParam
									: [];
						const isPartnerHidden = this.getNodeParameter('is_partner_hidden', 0, false) as boolean;

						// No JSON parameters to handle

						// Convert comma-separated strings to arrays
						const countryCodes = countryCodesStr
							? countryCodesStr.split(',').map((code) => code.trim())
							: [];
						const cityIds =
							cityIdsStr === 'All'
								? null
								: cityIdsStr
									? cityIdsStr.split(',').map((id) => id.trim())
									: [];
						const osTypeIds =
							osTypeIdsStr === 'All'
								? null
								: osTypeIdsStr
									? osTypeIdsStr.split(',').map((id) => id.trim())
									: [];
						const deviceTypeIds =
							deviceTypeIdsStr === 'All'
								? null
								: deviceTypeIdsStr
									? deviceTypeIdsStr.split(',').map((id) => id.trim())
									: [];
						// goals is already an array of strings (ftd, registration, commission) from multiOptions

						// Build request body with all parameters
						const body: IDataObject = {
							country_codes: countryCodes,
							city_ids: cityIds,
							os_type_ids: osTypeIds,
							device_type_ids: deviceTypeIds,
							payment_type: paymentType,
							payout_value: payoutValue,
							payout_currency: payoutCurrency,
							revenue_value: revenueValue,
							revenue_currency: revenueCurrency,
							goals,
							is_partner_hidden: isPartnerHidden,
						};

						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'POST',
							endpoint: `/v1/admin/offers/${offerId}/conditions`,
							body,
						})) as IDataObject;
						returnData.push(responseData);
					}

					if (operation === 'createLandingPage') {
						const offerId = this.getNodeParameter('offerId', 0);

						// Get required parameters
						const name = this.getNodeParameter('name', 0) as string;
						const url = this.getNodeParameter('url', 0) as string;
						const targetLink = this.getNodeParameter('target_link', 0) as string;

						// Get optional parameters
						const isEnabled = this.getNodeParameter('is_enabled', 0, true) as boolean;

						// Handle partner_ids - it could be null, a string, or an array
						const partnerIdsParam = this.getNodeParameter('partner_ids', 0, null);
						// Convert to array if it's a string
						const partnerIds =
							partnerIdsParam === null
								? null
								: typeof partnerIdsParam === 'string'
									? partnerIdsParam === ''
										? null
										: partnerIdsParam.split(',').map((id) => id.trim())
									: partnerIdsParam;

						// Build request body
						const body: IDataObject = {
							name,
							is_enabled: isEnabled,
							url,
							target_link: targetLink,
							partner_ids: partnerIds,
						};

						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'POST',
							endpoint: `/v1/admin/offers/${offerId}/landings`,
							body,
						})) as IDataObject;
						returnData.push(responseData);
					}

					if (operation === 'getOffers') {
						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: '/v1/admin/offers',
							query: queryParameters,
						})) as IDataObject;
						returnData.push(responseData);
					}
				}

				// PARTNER
				if (resource === 'partner') {
					if (operation === 'getPartners') {
						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: '/v1/admin/partners',
							query: queryParameters,
						})) as IDataObject;
						returnData.push(responseData);
					}
				}

				// PROMOCODE
				if (resource === 'promocode') {
					if (operation === 'getPromocodes') {
						// Make API request
						const responseData = (await alanbaseApiRequest.call(this, {
							method: 'GET',
							endpoint: '/v1/admin/promocodes',
							query: queryParameters,
						})) as IDataObject;
						returnData.push(responseData);
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
