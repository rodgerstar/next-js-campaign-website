import { mongooseConnect } from "@/lib/mongodb";
import { Project } from "@/models/Project";

export default async function handle(req, res) {

    // if authenticated connect to db
    await mongooseConnect();
    const {method} = req;

    if (method === "GET") {
      if (req.query?.id) {
          //fetch a single project by id
          const project = await Project.findById(req.query.id);
          res.json(project);
      } else if (req.query?.projectCategory){
          // fetch projects by category
          const projectCategory = await Project.find({projectCategory: req.query.projectCategory});
          res.json(projectCategory);
      }else if (req.query?.slug) {
          //fetch project by slug
          const projectSlug = await Project.find({slug: req.query.slug});
          res.json(projectSlug.reverse());
      } else {
          // fetch all projects
          const projects = await Project.find();
          res.json(projects.reverse());
      }
    } else {
          res.status(404).json({error: "No such project"});
    }
}