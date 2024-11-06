import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
 
        
interface CollegeData {
    "college name": string;
    "college address": string;
    "available branch": string;
    "college phone number": string;
    "branch cutoff": string;
    "image": string;
    id: string;
  }

interface CollegeCardProps {
    college: CollegeData;
    key: string;
    }

export default function CollegeCard({ college }: CollegeCardProps) {
    return (
        <Card sx={{ maxWidth: 400, margin: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                        {college["college name"]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Address: {college["college address"]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Branche: {college["available branch"]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Phone: {college["college phone number"]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cutoff: {college["branch cutoff"]}
                </Typography>
            </CardContent>
            <img
                src={college.image}
                alt={`${college["college name"]} image`}
                style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
        </Card>
    );
}
