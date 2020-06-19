/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

export function ComponentMapper(props: {component: React.Component; data: any[]; children: any} ) {

	return (

		<div>
			{
				props.data.map((_, index) => {
					return (
						<props.component
							key={index}
							props
						>
							{props.children}
						</props.component>
					);
				})
			}
		</div>
	)

}
