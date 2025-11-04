export default function CollapseButtons() {
  return (
    <p className="d-inline-flex gap-1 collapse-buttons">
      <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#speedCollapse" aria-expanded="false" aria-controls="speedCollapse">Speed</button>
      <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bassLineCollapse" aria-expanded="false" aria-controls="bassLineCollapse">Bass Line</button>
      <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mainArpCollapse" aria-expanded="false" aria-controls="mainArpCollapse">Main Arp</button>
      <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#drums1Collapse" aria-expanded="false" aria-controls="drums1Collapse">Drums 1</button>
      <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#drums2Collapse" aria-expanded="false" aria-controls="drums2Collapse">Drums 2</button>
    </p>
  );
}
