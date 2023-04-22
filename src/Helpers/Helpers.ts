export const customPayloadResponse = (
	status: boolean,
	payload: any
): object => {
	return {
		status: status,
		payload: payload,
	};
};
