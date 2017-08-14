import Helper from './../app/helpers';
import { find } from 'lodash';

import Providence from './data/providence.json';
import Retribution from './data/retribution.json';

let providenceBpcComponents = Providence.bpc_components;
let retributionBpcComponents = Retribution.bpc_components;

describe('Manufacture', () => {
  it('calculate Providence ME 10', () => {
    let modifiedComponents = Helper.manufactureQty(providenceBpcComponents, 10, 1, 1);

    let cargoBay = find(modifiedComponents, { item_id: 21027 });
    let constructionParts = find(modifiedComponents, { item_id: 21037 });
    let propEngine = find(modifiedComponents, { item_id: 21009 });
    let armorPlates = find(modifiedComponents, { item_id: 21017 });

    expect(75).toBe(cargoBay.qty);
    expect(48).toBe(constructionParts.qty);
    expect(20).toBe(propEngine.qty);
    expect(16).toBe(armorPlates.qty);
  });

  it('calculate Providence ME 7', () => {
    let modifiedComponents = Helper.manufactureQty(providenceBpcComponents, 7, 1, 3);

    let cargoBay = find(modifiedComponents, { item_id: 21027 });
    let constructionParts = find(modifiedComponents, { item_id: 21037 });
    let propEngine = find(modifiedComponents, { item_id: 21009 });
    let armorPlates = find(modifiedComponents, { item_id: 21017 });

    expect(232).toBe(cargoBay.qty);
    expect(148).toBe(constructionParts.qty);
    expect(62).toBe(propEngine.qty);
    expect(48).toBe(armorPlates.qty);
  });

  it('calculate Retribution ME 8 RUN 3', () => {
    let modifiedComponents = Helper.manufactureQty(retributionBpcComponents, 8, 1, 3);

    let Morphite = find(modifiedComponents, { item_id: 11399 });
    let FusionThruster = find(modifiedComponents, { item_id: 11532 });
    let TesseractCapacitorUnit = find(modifiedComponents, { item_id: 11554 });
    let RadarSensorCluster = find(modifiedComponents, { item_id: 11537 });
    let NanoelectricalMicroprocessor = find(modifiedComponents, { item_id: 11539 });
    let ConstructionBlocks = find(modifiedComponents, { item_id: 3828 });
    let Punisher = find(modifiedComponents, { item_id: 597 });
    let RAM = find(modifiedComponents, { item_id: 11478 });
    let TungstenCarbideArmorPlate = find(modifiedComponents, { item_id: 11543 });
    let AntimatterReactorUnit = find(modifiedComponents, { item_id: 11549 });
    let LinearShieldEmitter = find(modifiedComponents, { item_id: 11557 });

    expect(125).toBe(Morphite.qty);
    expect(64).toBe(FusionThruster.qty);
    expect(249).toBe(TesseractCapacitorUnit.qty);
    expect(83).toBe(RadarSensorCluster.qty);
    expect(373).toBe(NanoelectricalMicroprocessor.qty);
    expect(105).toBe(ConstructionBlocks.qty);
    expect(3).toBe(Punisher.qty);
    expect(17).toBe(RAM.qty);
    expect(2484).toBe(TungstenCarbideArmorPlate.qty);
    expect(23).toBe(AntimatterReactorUnit.qty);
    expect(83).toBe(LinearShieldEmitter.qty);
  });

  it('calculate Providence -> Cargo Bay ME 3 RUN 7', () => {
    let modifiedComponents = Helper.manufactureQty(providenceBpcComponents, 3, 1, 7);
    let cargoBay = find(modifiedComponents, { item_id: 21027 });

    let modifiedCargoBayComponents = Helper.manufactureQty(cargoBay.components, 8, 1, 564);

    let mat34 = find(modifiedCargoBayComponents, { item_id: 34 });
    let mat35 = find(modifiedCargoBayComponents, { item_id: 35 });
    let mat36 = find(modifiedCargoBayComponents, { item_id: 36 });
    let mat37 = find(modifiedCargoBayComponents, { item_id: 37 });
    let mat38 = find(modifiedCargoBayComponents, { item_id: 38 });
    let mat39 = find(modifiedCargoBayComponents, { item_id: 39 });
    let mat40 = find(modifiedCargoBayComponents, { item_id: 40 });

    expect(453969150).toBe(mat34.qty);
    expect(37439268).toBe(mat35.qty);
    expect(12772751).toBe(mat36.qty);
    expect(1818156).toBe(mat37.qty);
    expect(517843).toBe(mat38.qty);
    expect(148400).toBe(mat39.qty);
    expect(33209).toBe(mat40.qty);
  });
});
