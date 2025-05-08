export class Mapping {
  maps: Array<(pos: number) => number> = [];

  addMap(map: (pos: number) => number) {
    this.maps.push(map);
  }

  map(pos: number): number {
    return this.maps.reduce((currentPos, mapFn) => mapFn(currentPos), pos);
  }
}
