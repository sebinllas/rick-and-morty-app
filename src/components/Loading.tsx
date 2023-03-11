import { TbLoader } from 'react-icons/tb';
import styled from 'styled-components';

const StyledLoading = styled(TbLoader)`
	color: #ffffff;
	font-size: 30px;
	margin: 0 auto;
	animation: spin 3s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const Loading = (props: any) => {
	return <StyledLoading {...props} />;
};
