import { Request, Response } from "express";
import Lead from "../models/Lead";


// CREATE LEAD
export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const lead = await Lead.create(req.body);

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// GET ALL LEADS
export const getLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    // SEARCH
    const search = req.query.search as string;

    // FILTER
    const status = req.query.status as string;

    // PAGINATION
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // SORTING
    const sort = req.query.sort === "asc" ? 1 : -1;

    // FILTER OBJECT
    const filter: any = {};

    // SEARCH LOGIC
    if (search) {
      filter.$or = [
        {
          name: { $regex: search, $options: "i" },
        },
        {
          email: { $regex: search, $options: "i" },
        },
      ];
    }

    // STATUS FILTER
    if (status) {
      filter.status = status;
    }

    // FETCH LEADS
    const leads = await Lead.find(filter)
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(limit);

    // TOTAL COUNT
    const total = await Lead.countDocuments(filter);

    res.status(200).json({
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      leads,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// UPDATE LEAD
export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Lead updated successfully",
      updatedLead,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// DELETE LEAD
export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lead deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};