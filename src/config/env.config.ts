interface ENV {
	PORT: number | undefined;
	NODE_ENV: string | undefined;
	MONGO_URI: string | undefined;
	API_VERSION: string | undefined;
}

interface Config {
	PORT: number;
	NODE_ENV: string;
	MONGO_URI: string;
	API_VERSION: string;
}

const getConfig = (): ENV => {
	return {
		PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
		NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : undefined,
		MONGO_URI: process.env.MONGO_URI ? process.env.MONGO_URI : undefined,
		API_VERSION: process.env.API_VERSION ? process.env.API_VERSION : undefined,
	};
};

const getSanitizedConfig = (configValues: ENV): Config => {
	for (const [key, value] of Object.entries(configValues)) {
		if (value === undefined) {
			throw new Error(`Missing key: '${key}' in config.env...`);
		}
	}
	return configValues as Config;
};

const config = getConfig();
const env = getSanitizedConfig(config);

export default env;
