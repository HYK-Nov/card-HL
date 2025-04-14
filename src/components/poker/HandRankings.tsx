export default function HandRankings() {
  return (
    <>
      <div className="Bombaram grid grid-cols-2 gap-x-10 gap-y-3 px-10 text-lg">
        <div className={"col-span-2 flex justify-center gap-5"}>
          <p>로열 스트레이트 플러시</p>
          <p>x100</p>
        </div>
        <div className="grid grid-flow-col grid-rows-4 gap-3">
          <div className={"flex justify-between"}>
            <p>파이브카드</p>
            <p>x30</p>
          </div>
          <div className={"flex justify-between"}>
            <p>스트레이트 플러시</p>
            <p>x15</p>
          </div>
          <div className={"flex justify-between"}>
            <p>포카드</p>
            <p>x10</p>
          </div>
          <div className={"flex justify-between"}>
            <p>풀하우스</p>
            <p>x5</p>
          </div>
        </div>
        <div className="grid grid-flow-col grid-rows-4 gap-3">
          <div className={"flex justify-between"}>
            <p>플러시</p>
            <p>x4</p>
          </div>
          <div className={"flex justify-between"}>
            <p>스트레이트</p>
            <p>x2</p>
          </div>
          <div className={"flex justify-between"}>
            <p>트리플</p>
            <p>x1</p>
          </div>
          <div className={"flex justify-between"}>
            <p>투페어</p>
            <p>x1</p>
          </div>
        </div>
      </div>
    </>
  );
}
