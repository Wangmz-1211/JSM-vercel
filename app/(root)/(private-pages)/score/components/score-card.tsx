"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useMemo, useState } from "react";
import ScoreCardScoreDisplay from "@/app/(root)/(private-pages)/score/components/score-card-score-display";
import ScoreCardProgress from "@/app/(root)/(private-pages)/score/components/score-card-progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FileEdit } from "lucide-react";
import ScoreEditForm from "@/app/(root)/(private-pages)/score/components/score-edit-form";
import ScoreDelete from "./score-delete";

const ScoreCard = ({ score }: { score: any }) => {
  const [record, setRecord] = useState(score);
  const [open, setOpen] = useState(false);

  const progress = useMemo(() => {
    let val = 0;
    if (record.vocabulary_score !== 0) val += 25;
    if (record.grammar_score !== 0) val += 25;
    if (record.reading_score !== 0) val += 25;
    if (record.listening_score !== 0) val += 25;
    return val;
  }, [
    record.vocabulary_score,
    record.grammar_score,
    record.reading_score,
    record.listening_score,
  ]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Card
          className="w-64 h-28 relative box-border overflow-clip text-foreground
				shadow-secondary shadow-md
				scale-125 hover:scale-150
				md:scale-100 md:hover:scale-110
				hover:z-10 duration-200 hover:shadow-2xl"
        >
          <CardHeader>
            <CardTitle className="absolute left-6">{record.title}</CardTitle>
            <CardContent>
              <ScoreCardProgress progress={progress} />
              <ScoreCardScoreDisplay totalScore={record.total_score} />
            </CardContent>
          </CardHeader>
        </Card>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <FileEdit className="inline-block mr-2 mb-1" /> Edit the score
            record
          </SheetTitle>
          <SheetDescription>
            You can edit the score record here.
          </SheetDescription>
        </SheetHeader>
        <ScoreEditForm
          record={record}
          setRecord={setRecord}
          setOpen={setOpen}
        />
        <ScoreDelete id={record.id} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
export default ScoreCard;
