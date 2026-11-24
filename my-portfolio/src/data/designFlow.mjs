// The homepage product development timeline: eight stages from a first
// sketch to production, each tied to the service that covers it. Also the
// source for the service cards below the timeline (same order).
export const stages = [
  {
    number: "01",
    label: "Brief",
    title: "Sketch, sample or existing part",
    body: "Work starts from whatever exists: hand sketches and reference photos, a physical sample, or a part whose drawings are lost. Physical parts are measured or scanned and rebuilt as parametric SolidWorks models.",
    chips: ["Sketch", "Sample", "Scan data"],
    href: "/services/reverse-engineering",
    linkText: "Reverse engineering",
    icon: "/images/reverse_engineering_icon.svg",
    card: {
      title: "Reverse Engineering",
      description:
        "Measured or scanned parts rebuilt as parametric SolidWorks models — useful when drawings are lost or a legacy part needs reproducing.",
    },
  },
  {
    number: "02",
    label: "Design",
    title: "Parametric 3D model",
    body: "Each part is built as a parametric SolidWorks model, so dimensions and features can be altered later without rework. Delivered as native SLDPRT files with STEP exports.",
    chips: ["SLDPRT", "STEP"],
    href: "/services/solidworks-design",
    linkText: "SolidWorks design",
    icon: "/images/parametric_icon.svg",
    signature: "parametric",
    card: {
      title: "Parametric 3D Models",
      description:
        "Parametric SolidWorks models, delivered as native SLDPRT/SLDASM files with STEP exports, built so dimensions and features can be altered without rework.",
    },
  },
  {
    number: "03",
    label: "Assembly",
    title: "Assembly and fit check",
    body: "The parts are brought together in a SolidWorks assembly, and fit and clearance are checked before anything is made.",
    chips: ["SLDASM"],
    href: "/services/solidworks-design",
    linkText: "Assembly modelling",
    icon: "/images/assembly_icon.svg",
    signature: "assembly",
    card: {
      title: "Assembly Modelling",
      description:
        "Multi-part SolidWorks assemblies (SLDASM) that integrate your components into a single 3D model and check fit and clearance before anything is made.",
    },
  },
  {
    number: "04",
    label: "Prototype",
    title: "3D printed prototype",
    body: "STL files exported from the model are 3D printed as functional prototypes, so the design can be handled, tested and corrected before money goes into tooling.",
    chips: ["STL"],
    href: "/services/solidworks-design",
    linkText: "Rapid prototyping",
    icon: "/images/prototyping_icon.svg",
    card: {
      title: "Rapid Prototyping",
      description:
        "Functional prototypes to test and validate your design, 3D printed from STL files produced directly from your CAD model.",
    },
  },
  {
    number: "05",
    label: "DFM review",
    title: "Design for manufacture review",
    body: "The model is checked against the process that will make it: wall thickness, draft angles, undercuts and material use. Changes are made in the model and listed in a written report.",
    chips: ["PDF report", "SLDPRT", "STEP"],
    href: "/services/dfm-consultancy",
    linkText: "DFM consultancy",
    icon: "/images/design_optimization.svg",
    card: {
      title: "Design Optimisation",
      description:
        "Analyse and refine existing designs to improve performance, reduce material use or simplify manufacture. Delivered as updated SLDPRT/SLDASM files with revised PDF drawings.",
    },
  },
  {
    number: "06",
    label: "Drawings",
    title: "Construction drawings",
    body: "The drawing pack tells the factory what to make and how to check it: dimensioned and toleranced PDF drawings, DXF profiles and a bill of materials.",
    chips: ["PDF pack", "DXF", "BOM"],
    href: "/services/construction-drawings",
    linkText: "Construction drawings",
    icon: "/images/drawings_icon.svg",
    signature: "drawings",
    card: {
      title: "Construction Drawings",
      description:
        "Drawing packs for manufacture: dimensioned and toleranced PDF drawings, DXF profiles and a bill of materials.",
    },
  },
  {
    number: "07",
    label: "Renders",
    title: "Photorealistic renders",
    body: "High-resolution images are rendered from the finished CAD model for listings, pitches and packaging, before the first production unit exists.",
    chips: ["PNG", "JPEG"],
    href: "/services/photorealistic-rendering",
    linkText: "Photorealistic rendering",
    icon: "/images/render_icon.svg",
    card: {
      title: "Photorealistic Rendering",
      description:
        "Photorealistic visualisations of your product from the CAD model, supplied as high-resolution images for listings, pitches and packaging.",
    },
  },
  {
    number: "08",
    label: "Production",
    title: "Files to the factory",
    body: "Models are converted to the formats the supplier's software opens and sent with the drawing pack. For parts made in Thailand or Vietnam, Simeon also handles supplier liaison: technical questions, prototypes and samples.",
    chips: ["STEP", "IGES", "DXF"],
    href: "/services/cad-file-conversion",
    linkText: "CAD file conversion",
    icon: "/images/file_conversion.svg",
    card: {
      title: "CAD File Conversion",
      description:
        "Conversion between STEP, IGES, DXF and native SolidWorks formats, so your files open cleanly in your suppliers' software.",
    },
  },
];
