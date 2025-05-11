export class Mapping {
  maps: Array<(pos: number) => number> = [];

  addMap(map: (pos: number) => number) {
    this.maps.push(map);
  }

  map(pos: number): number {
    let num = this.maps.reduce((currentPos, mapFn) => mapFn(currentPos), pos);

    if (Math.sign(num) === -1) return 0;

    return num;
  }
}
