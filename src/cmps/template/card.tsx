interface IProp {
	title: string
	value: number
}

export const Card = ({ title, value }: IProp) => {
	return (
		<div className='card-info'>
			<div className='wrap'>
				<h4 className='title'>{title}</h4>
				<span className='value'>{value}</span>
			</div>
		</div>
	)
}
