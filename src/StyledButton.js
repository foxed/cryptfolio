import glamorous from 'glamorous';

export default glamorous.button(
	{
		backgroundColor: '#141414',
		color: '#45D40C',
		margin: 10,
		border: 'dashed solid',
		borderWidth: 'thin',
		borderColor: 'green',
		display: 'inline-block',
		padding: '5px 10px',
		textAlign: 'center',
		borderRadius: 1,
		textColor: 'red',
		fontFamily: 'Courier New',
		':hover':{
			opacity: 0.5,
		},
		':focus':{ outline: 0},
	}
);
