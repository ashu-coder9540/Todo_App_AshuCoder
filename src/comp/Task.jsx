import TaskCss from "./task.module.css"
function Task(props) {
    const { ctask, rtask, ttask } = props;
    return ( 
        <>
            <section className={TaskCss.task_container}>
                <div className={TaskCss.task_heading} ><p>Completed task :- {ctask}</p></div>
                <div className={TaskCss.task_complete}>{ctask}/{ttask}</div>
            </section>
        </>
     );
}

export default Task;