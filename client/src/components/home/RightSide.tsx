import React, { useState } from "react";
import FriendList from "./FriendList";
import Filter from "./Filter";

export default function RightSide() {
	const [selected, setSelected] = useState<number>(0);

	return (
		<div>
			{selected === 0 ? (
				<FriendList setSelected={() => setSelected(1)} />
			) : (
				<Filter setSelected={() => setSelected(0)} />
			)}
		</div>
	);
}
